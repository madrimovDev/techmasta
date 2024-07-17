import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/users.dto';
import { ApiTags } from '@nestjs/swagger';
import { WrapperDecorator } from '../../common/decorators/wrapper.decorator';
import { Role } from '../../common/guards';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Get All Users'],
  })
  @Get('/')
  getAll() {
    return this.usersService.findAll();
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Get User By Id'],
  })
  @Get('/id/:id')
  getById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Get user by username'],
  })
  @Get('/username/:username')
  getByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Update user by username'],
  })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateUserDto) {
    return this.usersService.update(id, updateRoleDto);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Delete user by username'],
  })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
