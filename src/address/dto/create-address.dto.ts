import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly line1: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly line2: string;

  @IsString()
  @IsNotEmpty()
  readonly zipCode: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly country: string;
}
