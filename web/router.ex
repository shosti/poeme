defmodule Poeme.Router do
  use Poeme.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Poeme do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/control", ControlController, :index
    post "/control/start", ControlController, :start
    post "/control/stop", ControlController, :stop
  end
end
