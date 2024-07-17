import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEYS = 'isPublic';
export const Public = () => SetMetadata(PUBLIC_KEYS, true);
