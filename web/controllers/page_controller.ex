defmodule Poeme.PageController do
  use Poeme.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def letsencrypt(conn, %{"id" => id}) do
    answer = System.get_env("ACME_CHALLENGE")
    if String.contains?(answer, id) do
      text conn, answer
    else
      conn |> put_status(:not_found) |> text("Not found")
    end
  end
end
