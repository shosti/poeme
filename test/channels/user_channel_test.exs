defmodule Poeme.UserChannelTest do

  use Poeme.ChannelCase

  alias Poeme.UserChannel

  setup do
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(UserChannel, "user:lobby")

    {:ok, socket: socket}
  end
end
