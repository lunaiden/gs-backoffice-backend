import { DataSource, Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Address } from '../address/entities/address.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepository extends Repository<Company> {
  constructor(
    @InjectRepository(Company)
    private CompanyRepository: Repository<Company>,
    @InjectRepository(Address)
    private AddressRepository: Repository<Address>,
    readonly dataSource: DataSource,
  ) {
    super(
      CompanyRepository.target,
      CompanyRepository.manager,
      CompanyRepository.queryRunner,
    );
  }

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const { name, siren, siret, noTva, isAutonomous, address } =
      createCompanyDto;

    const newCompany = this.create({
      name,
      siren,
      siret,
      noTva,
      isAutonomous: String(isAutonomous) === 'true',
      address: address,
    });

    await this.dataSource.transaction(async (manager) => {
      await manager.save(newCompany.address);
      await manager.save(newCompany);
    });

    return newCompany;
  }

  async updateCompany(id, updateCompanyDto: UpdateCompanyDto) {
    const { name, siren, siret, noTva, isAutonomous, address } =
      updateCompanyDto;

    console.log(updateCompanyDto);
    console.log(name);
    await this.dataSource.transaction(async (manager) => {
      try {
        await manager.update(Company, id, {
          name,
          siren,
          siret,
          noTva,
          isAutonomous,
        });
        if (address) {
          await manager.update(Address, address.id, { ...address });
        }
      } catch (err) {
        console.log(err);
      }
    });
    return this.findOne({ where: { id } });
  }
}
