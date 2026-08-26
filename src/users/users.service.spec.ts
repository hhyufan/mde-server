import { UsersService } from './users.service';

describe('UsersService refresh token updates', () => {
  it('atomically removes expired tokens and appends the new token', async () => {
    const updateOne = jest.fn().mockResolvedValue({ modifiedCount: 1 });
    const service = new UsersService({ updateOne } as any);
    const expiresAt = new Date(Date.now() + 60_000);

    await service.addRefreshToken('user-1', 'new-hash', expiresAt);

    const [filter, pipeline] = updateOne.mock.calls[0];
    expect(filter).toEqual({ _id: 'user-1' });
    expect(Array.isArray(pipeline)).toBe(true);
    expect(pipeline).toHaveLength(1);
    expect(pipeline[0].$pull).toBeUndefined();
    expect(pipeline[0].$push).toBeUndefined();

    const [retainedTokens, appendedTokens] =
      pipeline[0].$set.refreshTokens.$concatArrays;
    expect(retainedTokens.$filter).toEqual({
      input: { $ifNull: ['$refreshTokens', []] },
      as: 'token',
      cond: { $gt: ['$$token.expiresAt', '$$NOW'] },
    });
    expect(appendedTokens).toEqual([
      expect.objectContaining({ tokenHash: 'new-hash', expiresAt }),
    ]);
  });

  it('atomically rotates a matching token without allowing double use', async () => {
    const updateOne = jest.fn().mockResolvedValue({ modifiedCount: 1 });
    const service = new UsersService({ updateOne } as any);
    const expiresAt = new Date(Date.now() + 60_000);

    const rotated = await service.rotateRefreshToken(
      'user-1',
      'old-hash',
      'next-hash',
      expiresAt,
    );

    expect(rotated).toBe(true);
    const [filter, pipeline] = updateOne.mock.calls[0];
    expect(filter).toEqual({
      _id: 'user-1',
      'refreshTokens.tokenHash': 'old-hash',
    });

    const [retainedTokens, appendedTokens] =
      pipeline[0].$set.refreshTokens.$concatArrays;
    expect(retainedTokens.$filter.cond).toEqual({
      $and: [
        { $ne: ['$$token.tokenHash', 'old-hash'] },
        { $gt: ['$$token.expiresAt', '$$NOW'] },
      ],
    });
    expect(appendedTokens).toEqual([
      expect.objectContaining({ tokenHash: 'next-hash', expiresAt }),
    ]);
  });

  it('reports a lost rotation race when the old token no longer matches', async () => {
    const updateOne = jest.fn().mockResolvedValue({ modifiedCount: 0 });
    const service = new UsersService({ updateOne } as any);

    await expect(
      service.rotateRefreshToken(
        'user-1',
        'already-used',
        'next-hash',
        new Date(Date.now() + 60_000),
      ),
    ).resolves.toBe(false);
  });
});
