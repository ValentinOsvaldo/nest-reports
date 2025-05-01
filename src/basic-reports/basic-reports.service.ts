import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from '../printer/printer.service';
import { getHelloWorldReport } from 'src/reports';
import { getEmploymentLetterReport } from 'src/reports/employment-letter';
import { getEmploymentLetterByIdReport } from 'src/reports/employment-letter-by-id.report';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({ name: 'Memo' });

    return this.printerService.createPdf(docDefinition);
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee)
      throw new NotFoundException(`Employee with id ${employeeId} not found`);

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Osvaldo Valentin',
      employerPosition: 'Software Engineer',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'AETO',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
