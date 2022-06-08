import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UploadLogoDTO {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  logo: string;
}
