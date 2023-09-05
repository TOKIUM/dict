# @dict-name User,user
# @dict-desc description for user.
class User
  # @dict-feature-name ping
  # @dict-feature-desc description for ping.
  def ping
    puts 'pong'
  end

  # @dict-ignore
  def ignored_ping
    puts 'pong'
  end
end
