import { z } from "zod";

const invalid_type_error = 'Arvo on väärän tyyppinen';
const required_error = 'Tämä kenttä on pakollinen';

export const KaraokeSchema = z.object({
 name: z
  .string({ invalid_type_error, required_error })
  .min(2, 'Nimen tulee olla vähintään 2 merkkiä pitkä'),
 song: z
  .string({ invalid_type_error, required_error })
  .min(1, 'Valitse biisi listalta')
  ,
 allowSave: z
  .boolean({ invalid_type_error, required_error }),
 songKey: z
  .string({ invalid_type_error, required_error }),
  picture: z.object({
    data: z.instanceof(File),
  }).nullable(),

});