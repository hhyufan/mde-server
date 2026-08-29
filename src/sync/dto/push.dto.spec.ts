import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateConfigDto } from './push.dto';

describe('UpdateConfigDto', () => {
  it('accepts the complete settings snapshot sent by the desktop client', async () => {
    const dto = plainToInstance(UpdateConfigDto, {
      theme: 'dark',
      language: 'zh',
      fontSize: 15,
      previewFontSize: 17,
      fontFamily: 'JetBrains Mono',
      lineHeight: 25,
      previewLineHeight: 29,
      previewZoomSync: false,
      tabSize: 2,
      wordWrap: true,
      lineNumbers: true,
      minimap: { enabled: false },
      autoSave: true,
      editorState: {
        sidebarVisible: true,
        sidebarView: 'explorer',
        viewMode: 'edit',
        toolbarVisible: true,
      },
      protocolVersion: 3,
      updatedAt: 456,
    });

    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    expect(errors).toEqual([]);
  });
});
