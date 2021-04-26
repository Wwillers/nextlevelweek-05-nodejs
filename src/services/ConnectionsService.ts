import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionCreate {
  id?: string;
  user_id: string;
  admin_id?: string;
  socket_id: string;
}

class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }
  async create({ id, user_id, admin_id, socket_id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      id,
      user_id,
      admin_id,
      socket_id,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const connection = await this.connectionsRepository.findOne({ user_id });
    return connection;
  }

  async findAllWithoutAdmin() {
    const connection = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ['user'],
    });
    return connection;
  }

  async findBySocketId(socket_id: string) {
    const connection = await this.connectionsRepository.findOne({ socket_id });
    return connection;
  }

  async updateAdminId(user_id: string, admin_id: string) {
    await this.connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where('user_id = :user_id', {
        user_id,
      })
      .execute();
  }
}

export { ConnectionsService };
