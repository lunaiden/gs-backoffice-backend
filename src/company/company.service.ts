import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyRepository } from './company.repository';
import { Address } from '../address/entities/address.entity';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(createCompanyDto: CreateCompanyDto) {
    return await this.companyRepository.createCompany(createCompanyDto);
  }

  findAll() {
    return this.companyRepository.find();
  }

  findOne(id: string) {
    return this.companyRepository.findOne({ where: { id } });
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.updateCompany(id, updateCompanyDto);
  }

  async remove(id: string) {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) throw new NotFoundException('Entreprise introuvable');

    await this.companyRepository.dataSource.transaction(async (manager) => {
      await manager.delete(Address, company.address.id);
      return await manager.delete(Company, id);
    });
  }
}
