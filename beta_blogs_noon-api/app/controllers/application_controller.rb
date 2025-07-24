class ApplicationController < ActionController::API
#   def authenticate_request
#     header = request.headers["Authorization"]
#     header = header.split(" ").last if header

#     begin
#       decoded = JWT.decode(header, Rails.application.credentials.secret_key_base).first
#       @current_user = User.find(decoded["user_id"])
#     rescue JWT::ExpiredSignature
#       render json: { error: "Token has expired" }, status: :unauthorized
#     rescue JWT::DecodeError
#       render json: { error: "Unauthorized" }, status: :unauthorized
#     end
#   end
# end

def authenticate_request
  header = request.headers["Authorization"]
  logger.debug "Auth Header: #{header}"

  header = header.split(" ").last if header
  logger.debug "Token: #{header}"

  begin
    decoded = JWT.decode(header, Rails.application.credentials.secret_key_base).first
    logger.debug "Decoded payload: #{decoded}"
    @current_user = User.find(decoded["user_id"])
  rescue JWT::ExpiredSignature
    logger.debug "JWT expired"
    render json: { error: "Token has expired" }, status: :unauthorized
  rescue JWT::DecodeError => e
    logger.debug "JWT decode failed: #{e.message}"
    render json: { error: "Unauthorized" }, status: :unauthorized
  end
end
end