import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl, ValidateNested
} from "class-validator";
import { InventoryDTO } from "@app/dto/dto/inventory.dto";
import { Type } from "class-transformer";

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  birthDate: Date;

  @IsOptional()
  @IsUrl()
  logo?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => InventoryDTO)
  inventories?: InventoryDTO[];
}
