
from requests_oauthlib import OAuth1Session
import urllib

CONSUMER_KEY = 'adsklfjlaksdjfasldfk'
CONSUMER_SECRET = 'aksdjfkjljasdfljLIJSDLKFjlskdjflaskjdfa'
ACCESS_TOKEN = '0923840928349082390283-kljadsflkJKLDfjdslkjklajkljdsfls'
ACCESS_SECRET = '098asdfkljLSkdjfsda09uaskdjflLKJESF'

twitter = OAuth1Session(CONSUMER_KEY,
                        client_secret=CONSUMER_SECRET,
                        resource_owner_key=ACCESS_TOKEN,
                        resource_owner_secret=ACCESS_SECRET)
webhook_endpoint = urllib.parse.quote_plus('https://myendpoint.com/webhook/')
url = 'https://api.twitter.com/1.1/account_activity/all/env-beta/webhooks.json?url={}'.format(webhook_endpoint)
r = twitter.post(url)
