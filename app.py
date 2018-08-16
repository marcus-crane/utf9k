import json

from flask import Flask, render_template, jsonify
import redis
import pendulum

import scheduler
import utils

app = Flask(__name__, static_url_path='')
last_deployed = pendulum.now(tz='Pacific/Auckland').strftime(
    '%B %-m %Y at around %-I%p')
rc = redis.StrictRedis(host='redis', port=6379, db=0, decode_responses=True)

scheduler.start_scheduler()
print('Started scheduler')


@app.route('/')
def index():
    return render_template('index.html', last_deployed=last_deployed)


@app.route('/projects')
def list_projects():
    projects = utils.list_content('projects', format_date=False)
    return render_template('list_projects.html', projects=projects,
                           last_deployed=last_deployed)


@app.route('/projects/<project>')
def view_project(project):
    project = utils.view_content(f'projects/{project}', format_date=False)
    return render_template('view_project.html', project=project,
                           last_deployed=last_deployed)


@app.route('/blog')
def list_posts():
    posts = utils.list_content('blog')
    return render_template('list_posts.html', posts=posts,
                           last_deployed=last_deployed)


@app.route('/blog/<post>')
def view_post(post):
    post = utils.view_content(f'blog/{post}')
    return render_template('view_post.html', post=post,
                           last_deployed=last_deployed)


@app.route('/api/movies')
def api_movies():
    return jsonify(json.loads(rc.execute_command('JSON.GET', 'movies')))

@app.route('/api/music')
def api_music():
    return jsonify(json.loads(rc.execute_command('JSON.GET', 'music')))


@app.route('/api/games')
def api_games():
    return jsonify(json.loads(rc.execute_command('JSON.GET', 'games')))


@app.route('/stats')
def view_stats():
    try:
        games = json.loads(rc.execute_command('JSON.GET', 'games'))
    except TypeError:
        games = None
    try:
        movies = json.loads(rc.execute_command('JSON.GET', 'movies'))
    except TypeError:
        movies = None
    try:
        music = json.loads(rc.execute_command('JSON.GET', 'music'))
    except TypeError:
        music = None
    return render_template('view_stats.html', tracks=music, games=games, movies=movies,
                           last_deployed=last_deployed)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000')
