import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/roles.dto';
import { ApiTags } from '@nestjs/swagger';
import { WrapperDecorator } from '../../common/decorators/wrapper.decorator';
import { Role } from '../../common/guards';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Get all roles'],
  })
  @Get('/')
  getAll() {
    return this.rolesService.findAll();
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Get role by id'],
  })
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Update role'],
  })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateRoleDto: CreateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Create a role'],
  })
  @Post('/')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Delete role'],
  })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.rolesService.delete(id);
  }
}
