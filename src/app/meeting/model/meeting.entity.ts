export class Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  link: string;
  recordingLink: string; // Nuevo campo para el enlace de grabación
  host: {
    name: string;
    email: string;
  };
  participants: Array<{
    name: string;
    email: string;
  }>;
  access_code: string;

  constructor() {
    this.id = 0;
    this.title = '';
    this.date = '';
    this.time = '';
    this.link = '';
    this.recordingLink = ''; // Inicialización del nuevo campo
    this.host = { name: '', email: '' };
    this.participants = [];
    this.access_code = '';
  }
}
