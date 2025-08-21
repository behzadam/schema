import { describe, expect, it } from 'vitest';
import { UserSchema } from './index';

describe('UserSchema', () => {
  it('validates a correct user', () => {
    const parsed = UserSchema.parse({ id: '123e4567-e89b-12d3-a456-426614174000', name: 'Ada' });
    expect(parsed.name).toBe('Ada');
  });

  it('fails for invalid uuid', () => {
    expect(() => UserSchema.parse({ id: 'not-a-uuid', name: 'Ada' })).toThrow();
  });
});
