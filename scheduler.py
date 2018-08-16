from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger

import sources


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.start()

    sources.fetch_games()
    sources.fetch_movies()
    sources.fetch_music()

    scheduler.add_job(
        func=sources.fetch_games,
        trigger=IntervalTrigger(hours=4),
        id='fetch_games',
        name='Fetch currently playing games',
        replace_existing=True)

    scheduler.add_job(
        func=sources.fetch_movies,
        trigger=IntervalTrigger(hours=3),
        id='fetch_movies',
        name='Fetch currently playing movies',
        replace_existing=True)

    scheduler.add_job(
        func=sources.fetch_music,
        trigger=IntervalTrigger(minutes=2),
        id='fetch_music',
        name='Fetch recently listened songs',
        replace_existing=True)