import os
from fabric.api import local, settings, abort, run, env
from fabric.operations import put
from fabric.context_managers import lcd

USER = 'developingo'
HOST = 'developingo.webfactional.com'

REMOTE_PATH = '/home/developingo/webapps/bittsys/snake'

env.hosts = ['%s@%s' % (USER, HOST)]

def deploy():
    """Do the magic"""
    with lcd('src'):
        local('make clean')
        local('make')

    put(local_path='dist/index.html', remote_path=os.path.join(REMOTE_PATH, 'index.html'))
    put(local_path='dist/package.manifest', remote_path=os.path.join(REMOTE_PATH, 'package.manifest'))
    put(local_path='dist/package.zip', remote_path=os.path.join(REMOTE_PATH, 'package.zip'))