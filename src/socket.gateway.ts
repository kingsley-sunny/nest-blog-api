import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8000, { cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(
      '🚀 ~~ SocketGateway ~~ handleConnection ~~ client:',
      client.id,
    );
  }

  @SubscribeMessage('video')
  handleMessage(@MessageBody() data: any): any {
    console.log('🚀 ~~ SocketGateway ~~ handleMessage ~~ data:', data);
  }

  @SubscribeMessage('video-stream')
  handleVideoStream(
    @MessageBody()
    data: any,
  ): any {
    console.log('🚀 ~~ SocketGateway ~~ handleVideoStream ~~ data:', data);

    console.log(typeof data);
  }

  handleDisconnect(client: any) {
    console.log(
      '🚀 ~~ SocketGateway ~~ handleDisconnect ~~ client: disconnected',
      client.id,
    );
  }
}
