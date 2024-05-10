import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAddressDto } from '../../address/dto/update-address.dto';

export class UpdateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
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
  @IsOptional()
  readonly isAutonomous: boolean;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  readonly address: UpdateAddressDto;
}
