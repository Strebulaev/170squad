  import { Component, OnInit } from '@angular/core';
  import { HttpClient } from '@angular/common/http';

  @Component({
    selector: 'app-donat',
    templateUrl: './donat.component.html',
    styleUrls: ['./donat.component.css']
  })
  export class DonatComponent implements OnInit {
    comments: { author: string, body: string }[];
    newComment: { author: string, body: string };
    showComments: boolean;
    telegramBotToken: string;
    telegramChatId: string;

    constructor(private http: HttpClient) {
      this.comments = [];
      this.newComment = { author: '', body: '' };
      this.showComments = JSON.parse(localStorage.getItem('showComments') || 'false');
      this.telegramBotToken = '7039702625:AAFGyFbkG8_pSWv9HtKw1BEBvOcPwGl3bYQ';
      this.telegramChatId = '-1001822383897';
    }

    ngOnInit(): void {
      const savedComments = localStorage.getItem('comments');
      this.comments = savedComments ? JSON.parse(savedComments) : [];
      this.getTelegramMessages();
    }

    addComment(): void {
      if (this.newComment.author !== '' && this.newComment.body !== '') {
        const comment: { author: string, body: string } = {
          author: this.newComment.author,
          body: this.newComment.body
        };

        // Проверяем IP-адрес отправителя
        this.http.get('https://api.ipify.org?format=json').toPromise()
          .then((response: any) => {
            const clientIp = response.ip;

            if (this.isProfane(comment.body) && clientIp !== '192.168.0.24') {
              console.log('Недостаточно прав для отправки комментариев, уёбки конченые, все кроме максюши конечно.');
            } else {
              // Добавляем комментарий, если это не матерное слово или если отправитель имеет санкционированный IP-адрес
              this.comments.push(comment);
              this.saveCommentsToLocalStorage();
              this.sendCommentToTelegram(comment);
              this.newComment = { author: '', body: '' };
            }
          })
          .catch((error: any) => {
            console.error('Error getting client IP:', error);
          });
      }
    }

    private isProfane(text: string): boolean {
      const forbiddenWords = ['Мать', 'мать', "Хуяк",
        "Хуй",
        "Сука",
        "Мразь",
        "Уёбок",
        "Пидр",
        "Илья",
        "Блямба",
        "Пиздоболик",
        "Ёбок",
        "Мудище",
        "Сучарин",
        "Жопин",
        "Дрочик",
        "Говнюк",
        "Пидрило",
        "Хуепет",
        "Блямбара",
        "Пиздострадалец",
        "Ёбика",
        "Муделло",
        "Сучарейка",
        "Жопонька",
        "Дрочунго",
        "Говняра",
        "Пидоруля",
        "Хуекун",
        "Блямбарин",
        "Пиздотреп",
        "Ёбут",
        "Муделка",
        "Сучиха",
        "Жопозад",
        "Дрочара",
        "Говнюка",
        "Пидорман",
        "Хуепидор",
        "Бляга",
        "Пиздамба",
        "Ёбырь",
        "Мудель",
        "Сучарило",
        "Жопотряс",
        "Дрочарка",
        "Говнист",
        "Пидрилич",
        "Хуесос",
        "Блякуда",
        "Пиздармун",
        "Ёбаклан",
        "Мудошлан",
        "Сучарёнок",
        "Жопмуд",
        "Дрочуля",
        "Говнищще",
        "Пидорунок",
        "Хуепоп",
        "Блякун",
        "Пиздожор",
        "Ёбудак",
        "Мудюра",
        "Сучарён",
        "Жопошник",
        "Дрочурка",
        "Говнюга",
        "Пидоргон",
        "Хуело",
        "Блялыка",
        "Пиздипль",
        "Ёбинет",
        "Мудер",
        "Сучарёшка",
        "Жопошный",
        "Дрочушка",
        "Говнищно",
        "Пидорашный",
        "Хуеподон",
        "Блякуня",
        "Пиздород",
        "Ёболон",
        "Мудосос",
        "Сучарёчка",
        "Жопосос",
        "Дрочика",
        "Говношник",
        "Пидорон",
        "Хуесосик",
        "Бляжить",
        "Пиздапет",
        "Ёбизя",
        "Мудудак",
        "Сучараент",
        "Жопают",
        "Дрочарит",
        "Говнярать",
        "Пидорить",
        "Хуебразить",
        "Блятье",
        "Пиздировать",
        "Ёбонуть",
        "Мудосесть",
        "Сучаринка",
        "Жоподой",
        "Дрочало",
        "Говницик",
        "Пидородить",
        "Хуесосить",
        "Бляшка",
        "Пиздолизить",
        "Ёбря",
        "Мудикан",
        "Сучарить",
        "Жопопых",
        "Дрочлок",
        "Говноячеич",
        "Пидораха",
        "Хуесосочка",
        "Бляковое",
        "Пиздодон",
        "Ёбососка",
        "Мудоизврат",
        "Сучарат",
        "Жопища",
        "Дрочлез",
        "Говновать",
        "Пидория",
        "Хуесосишка",
        "Блямбаха",
        "Пиздовис",
        "Ёблист",
        "Мударит",
        "Сучарачка",
        "Жопка",
        "Дрочло",
        "Говнюшкин",
        "Пидорозид",
        "Хуераса",
        "Блямбазон",
        "Пиздовдача",
        "Ёбрык",
        "Мудина",
        "Сучарику",
        "Жопомудия",
        "Дрочима",
        "Говнюшно",
        "Пидориять",
        "Хуесосимонка",
        "Блякульт",
        "Пиздоватец",
        "Ёбизядь",
        "Мудедой",
        "Сучаросливец",
        "Жопуляризир",
        "Дрочимось",
        "Говнет",
        "Пидорствуйте",
        "Хуесосимонски",
        "Блякульчище",
        "Пиздоватить",
        "Ёбанул",
        "Мудошёлничать",
        "Сучарь",
        "Жопой",
        "Дрочимат",
        "Говнешница",
        "Пидорствовать",
        "Хуесосыр",
        "Бляквенно",
        "Пиздоватость",
        "Ёбуга",
        "Мудораз",
        "Сучарень",
        "Жопщина",
        "Дрочение",
        "Говняд",
        "Пидорствующий",
        "Хуесосыва",
        "Блякопая",
        "Пиздоваться",
        "Ёбучить",
        "Мудососить",
        "Сучариться",
        "Жопуляция",
        "Дрочется",
        "Говносо",
        "Пидорствующая",
        "Хуесосывага",
        "Блялитио",
        "Пиздований",
        "Ёбинск",
        "Мудиклик",
        "Сучарец",
        "Жопущий",
        "Дрочется",
        "Говнодёр",
        "Пидорствующую",
        "Хуесоск",
        "Блякюпет",
        "Пиздовеврей",
        "Ёбизилка",
        "Мудоржать",
        "Сучарища",
        "Жопский",
        "Дрочиловка",
        "Говнопомпа",
        "Пидорствующее",
        "Хуесосковаться",
        "Блякунёр",
        "Пиздовый",
        "Ёбаграть",
        "Мудизилка",
        "Сучарёшка",
        "Жопень",
        "Дрочня",
        "Говноха",
        "Пидорствующее",
        "Хуесосковить",
        "Блямбать",
        "Пиздогубство",
        "Ёбаклик",
        "Мудорий",
        "Сучаренок",
        "Жопущее",
        "Дрочиха",
        "Говнососёт",
        "Пидорствующее",
        "Хуесоскова",
        "Блякать",
        "Пиздомудство",
        "Ёбачить",
        "Мудочит",
        "Сучарянка",
        "Жопенька",
        "Дрочита",
        "Говнопляс",
        "Пидара",
        "Хуесосет",
        "Блякается",
        "Пизди",
        "Ёбу",
        "Мудя",
        "Сучка",
        "Жопа"];
      return forbiddenWords.some(word => text.includes(word));
    }


    deleteComment(index: number): void {
      this.comments.splice(index, 1);
      this.saveCommentsToLocalStorage();
    }

    toggleComments(): void {
      this.showComments = !this.showComments;
      localStorage.setItem('showComments', JSON.stringify(this.showComments));
    }

    private saveCommentsToLocalStorage(): void {
      localStorage.setItem('comments', JSON.stringify(this.comments));
    }

    private async getTelegramMessages(): Promise<void> {
      try {
        const response = await this.http.get<any>(`https://api.telegram.org/bot${this.telegramBotToken}/getUpdates`).toPromise();
        const messages = response.result;

        messages.forEach((message: any) => {
          if (message.message && message.message.chat.type === 'group' &&
            message.message.chat.id.toString() === this.telegramChatId) {
            const author = message.message.from.username || message.message.from.first_name;
            const body = message.message.text;
            this.comments.push({ author, body });
          }
        });

        this.saveCommentsToLocalStorage();
      } catch (error) {
        console.error('Error getting Telegram messages:', error);
      }
    }

    private async sendCommentToTelegram(comment: { author: string, body: string }): Promise<void> {
      const message = `
      <strong>Автор:</strong> ${comment.author}
<strong>Комментарий:</strong> ${comment.body}
      `;

      try {
        await this.http.post<any>(`https://api.telegram.org/bot${this.telegramBotToken}/sendMessage`, {
          chat_id: this.telegramChatId,
          text: message,
          parse_mode: 'HTML'
        }).toPromise();
        console.log('Comment sent to Telegram');
      } catch (error) {
        console.error('Error sending comment to Telegram:', error);
      }
    }
  }
