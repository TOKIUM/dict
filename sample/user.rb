# @dict-name User
# @dict-desc description for user.
class User
  # @dict-name User
  # @dict-feature-name ping
  # @dict-feature-desc description for ping.
  def ping
    puts 'pong'
  end
end

class UserService
  # @dict-name User
  # @dict-feature-name puts 
  # @dict-feature-desc puts user.
  def puts_user(user)
    puts user
  end
end
