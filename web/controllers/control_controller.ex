defmodule Poeme.ControlController do
  use Poeme.Web, :controller
  alias Poeme.Presence
  alias Poeme.Endpoint

  def index(conn, _params) do
    metronome_count = "user:metronome" |> Presence.list() |> Enum.count()

    render conn, "index.html", metronome_count: metronome_count
  end

  def start(conn, _params) do
    Endpoint.broadcast! "user:metronome", "start", %{}
    conn
    |> put_flash(:info, "Started")
    |> redirect(to: control_path(conn, :index))
  end

  def stop(conn, _params) do
    Endpoint.broadcast! "user:metronome", "stop", %{}
    conn
    |> put_flash(:info, "Stopped")
    |> redirect(to: control_path(conn, :index))
  end
end
