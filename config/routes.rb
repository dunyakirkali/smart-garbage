Rails.application.routes.draw do
  get 'pages/home'
  get 'pages/ilana'

  root 'pages#home'
end
