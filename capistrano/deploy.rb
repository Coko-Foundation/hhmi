# The name for the application, should only be things that can be in a directory name
set :application, 'hhmi-assessment-builder-nodejs'

# The repo URL
set :repo_url, 'https://github.com/forumone/hhmi-assessment-builder-nodejs'

# Or use the line below to deploy via rsync
set :scm, :rsync

# Use a remote cache for git
set :deploy_via, :remote_cache

# Which logging formatter to use
set :format, :pretty

# Which logging level to use
set :log_level, :debug

# Setting verbose
set :verbose, 1

# Whether to use sudo for commands
set :user_sudo, false

# Whether to use a pseudo-TTY
set :pty, true

# Number of release directories to keep
set :keep_releases, 3



# Add custom SSH config
set :ssh_options, {
  config: 'config/ssh_config'
}

# Platform is declared in the ./buildkite/pipeline-base.yml
if ENV['platform']
  set :platform, ENV['platform']
end

# allow for a flag to be passed that prevents staging the rsync target
if ENV['ignore_rsync_stage']
  set :rsync_stage, nil
else
  set :rsync_stage, 'tmp/deploy'
end


case ENV['app']
when "client"
    set :rsync_options, %w[--links --recursive --chmod=Dug=rwx,Do=rx --perms --delete --delete-excluded --exclude=.git*]
    set :rsync_stage, "packages/client"

when "server"
    set :rsync_options, %w[--links --recursive --chmod=Dug=rwx,Do=rx --perms --delete --delete-excluded --exclude=.git*]
    set :rsync_stage, "packages/server"
end
set :rsync_copy, "rsync --archive --acls --xattrs"
set :rsync_cache, "shared/deploy"


case ENV['app']
when "client"
    set :app_webroot, "public"
    set :webroot, 'public'

    # Link directories and files.
    set :linked_dirs, []
    set :linked_files, []
when "server"
    set :app_webroot, "./"
    set :webroot, 'public'

    # Link directories and files.
    set :linked_dirs, []
    set :linked_files, []
end

# #
# deploy_dir = 'services'
# case ENV['service']
# when "app"
#   set :app_webroot, "#{deploy_dir}/app"
#
# else
#   set :app_webroot, "#{deploy_dir}/app"
# end

