import { z } from "zod";

const invalid_type_error = 'Invalid type provided for this field';
const required_error = 'This field cannot be blank';

export const KaraokeSchema = z.object({
 name: z
  .string({ invalid_type_error, required_error })
  .min(2, 'Value is too short'),
 song: z
  .string({ invalid_type_error, required_error }),
 allowSave: z
  .boolean({ invalid_type_error, required_error }),
 songKey: z
  .string({ invalid_type_error, required_error })
});