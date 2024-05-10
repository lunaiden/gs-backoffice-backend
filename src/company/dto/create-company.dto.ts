import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '../../address/dto/create-address.dto';
import { Type } from 'class-transformer';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @Length(9, 9)
  @IsOptional()
  readonly siren: string;

  @IsString()
  @Length(14, 14)
  @IsOptional()
  readonly siret: string;

  @IsString()
  @IsOptional()
  readonly noTva: string;

  @IsString()
  @IsNotEmpty()
  readonly isAutonomous: boolean;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  readonly address: CreateAddressDto;
  //
  // readonly logo: File
}
