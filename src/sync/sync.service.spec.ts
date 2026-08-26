import { SyncService } from './sync.service';

describe('SyncService protocol migration', () => {
  it('upgrades a legacy config to protocol v3 without deleting documents', async () => {
    const findOne = jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue({
        _id: 'config-1',
        userId: '507f1f77bcf86cd799439011',
        protocolVersion: 2,
        updatedAtMs: 123,
      }),
    });
    const updateOne = jest.fn().mockResolvedValue({ modifiedCount: 1 });
    const configModel = { findOne, updateOne };
    const docModel = { deleteMany: jest.fn() };
    const service = new SyncService(docModel as any, configModel as any);

    const config = await service.getConfig('507f1f77bcf86cd799439011');

    expect(config.protocolVersion).toBe(3);
    expect(config.updatedAt).toBe(123);
    expect(updateOne).toHaveBeenCalledTimes(1);
    expect(updateOne.mock.calls[0][0].userId.toHexString()).toBe(
      '507f1f77bcf86cd799439011',
    );
    expect(updateOne.mock.calls[0][1]).toEqual({
      $set: { protocolVersion: 3 },
    });
    expect(docModel.deleteMany).not.toHaveBeenCalled();
  });

  it('does not downgrade a config from a newer server protocol', async () => {
    const findOne = jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue({
        _id: 'config-2',
        userId: '507f1f77bcf86cd799439011',
        protocolVersion: 4,
      }),
    });
    const updateOne = jest.fn();
    const service = new SyncService({} as any, { findOne, updateOne } as any);

    const config = await service.getConfig('507f1f77bcf86cd799439011');

    expect(config.protocolVersion).toBe(4);
    expect(updateOne).not.toHaveBeenCalled();
  });
});
