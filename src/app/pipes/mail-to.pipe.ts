import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mailTo',
})
export class MailToPipe implements PipeTransform {
  transform(mail: string, subject?: string, body?: string): string {
    const _subject = subject ? `?SUBJECT=${subject}` : '';
    const _body = body
      ? `${_subject.startsWith('?') ? '&' : '?'}BODY=${body}`
      : '';

    const mailToHref = `mailto:${mail}${_subject}${_body}`;
    return mailToHref;
  }
}
