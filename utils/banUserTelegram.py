from telethon import TelegramClient
from telethon.tl.functions.channels import InviteToChannelRequest
from telethon.tl.types import InputPhoneContact
from telethon.tl.functions.contacts import ImportContactsRequest
from telethon import functions, types
import sys
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '/apps/PositionAPI/config/config.env')
load_dotenv(dotenv_path)

# Remember to use your own values from my.telegram.org!
api_id = os.environ.get("TELEGRAM_API_ID")
api_hash = os.environ.get("TELEGRAM_API_HASH")
client = TelegramClient(
    '/apps/PositionAPI/utils/investRobos.session', api_id, api_hash)
phone_number = os.environ.get("TELEGRAM_PHONE_NUMBER")

channel_id = os.environ.get("TELEGRAM_CHANNEL_ID")
channel_link = os.environ.get("TELEGRAM_CHANNEL_LINK")

guest_phone_number = sys.argv[1]
guest_first_name = sys.argv[2]
guest_last_name = sys.argv[3]


async def banUserFromChannel():
    # add user to contact
    result = await client(functions.contacts.ImportContactsRequest(
        contacts=[types.InputPhoneContact(
            client_id=0,
            phone=guest_phone_number,
            first_name=guest_first_name,
            last_name=guest_last_name
        )]
    ))

    # Find channel
    channel = await client.get_entity(channel_link)

    # Ban a user from channel
    banUser = await client(functions.channels.EditBannedRequest(
        channel=channel,
        user_id=result.users[0],
        banned_rights=types.ChatBannedRights(
            until_date=0,
            view_messages=True,
            send_messages=True,
            send_media=True,
            send_stickers=True,
            send_gifs=True,
            send_games=True,
            send_inline=True,
            send_polls=True,
            change_info=True,
            invite_users=True,
            pin_messages=True
        )
    ))

    # remove user from contacts
    removeContact = await client(functions.contacts.DeleteContactsRequest(
        id=[result.users[0]]
    ))

with client:
    client.loop.run_until_complete(banUserFromChannel())
