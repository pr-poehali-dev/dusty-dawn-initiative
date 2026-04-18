import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Принимает заявку на обмен валюты и отправляет её на почту peppkli@gmail.com"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    raw_body = event.get('body') or '{}'
    body = json.loads(raw_body) if raw_body.strip() else {}

    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    amount = body.get('amount', '').strip()
    currency = body.get('currency', '').strip()

    if not all([name, phone, email, amount, currency]):
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните все поля'})
        }

    gmail_user = 'peppkli@gmail.com'
    gmail_password = os.environ['GMAIL_APP_PASSWORD']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка на обмен — PEPPYLOT'
    msg['From'] = gmail_user
    msg['To'] = gmail_user

    html = f"""
    <html><body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
      <div style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="margin-top: 0; color: #111;">💱 Новая заявка на обмен</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; color: #666; width: 130px;">ФИО</td><td style="padding: 10px 0; font-weight: bold; color: #111;">{name}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding: 10px 8px; color: #666;">Телефон</td><td style="padding: 10px 8px; font-weight: bold; color: #111;">{phone}</td></tr>
          <tr><td style="padding: 10px 0; color: #666;">Email</td><td style="padding: 10px 0; font-weight: bold; color: #111;">{email}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding: 10px 8px; color: #666;">Сумма</td><td style="padding: 10px 8px; font-weight: bold; color: #111;">{amount}</td></tr>
          <tr><td style="padding: 10px 0; color: #666;">Валюта</td><td style="padding: 10px 0; font-weight: bold; color: #111;">{currency}</td></tr>
        </table>
        <p style="margin-top: 24px; font-size: 12px; color: #aaa;">PEPPYLOT — обменник валют</p>
      </div>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html'))

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(gmail_user, gmail_password)
            server.sendmail(gmail_user, gmail_user, msg.as_string())
    except Exception as e:
        print(f"SMTP ERROR: {e}")
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }