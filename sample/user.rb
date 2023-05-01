# @dict-name User
# @dict-desc User desc 1
class User
  # @dict-name User
  # @dict-desc User desc 2
  # @dict-feature-name User feature 1
  # @dict-feature-desc User feature desc 1-1
  def ping
    puts 'pong'
  end
end

class UserService
  # @dict-name User
  # @dict-feature-name User feature 2
  # @dict-feature-desc User feature desc 2-1
  def puts_user(user)
    # @dict-feature-desc User feature desc 2-2
    puts user
  end
end


# @dict-name Another
# @dict-desc Another desc 1

# @dict-desc Another desc 2
