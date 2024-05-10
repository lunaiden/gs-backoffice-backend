import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly line1: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly line2: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly zipCode: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly country: string;
}
