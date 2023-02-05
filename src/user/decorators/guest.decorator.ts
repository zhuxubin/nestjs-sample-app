import { SetMetadata } from '@nestjs/common';

import { ALLOW_GUEST } from '@/core/constants';

// 游客的装饰器
export const Guest = () => SetMetadata(ALLOW_GUEST, true);
