defmodule Poeme.UserChannel do
  alias Poeme.Presence

  @tempos Enum.shuffle([
    50,
    52,
    54,
    56,
    58,
    60,
    63,
    66,
    69,
    72,
    76,
    80,
    84,
    88,
    92,
    96,
    100,
    104,
    108,
    112,
    116,
    120,
    126,
    132,
    138,
    144,
  ])

  @max_metronomes 100

  use Poeme.Web, :channel

  def join("user:metronome", _payload, socket) do
    ids = Presence.list(socket)
    |> Map.keys()
    |> Enum.map(&String.to_integer/1)

    if Enum.count(ids) >= @max_metronomes do
      {:error, %{reason: "too many metronomes"}}
    else
      last_id = if Enum.empty?(ids), do: -1, else: Enum.max(ids)
      id = last_id + 1
      tempo = @tempos |> Enum.at(rem(id, Enum.count(@tempos)))
      socket = socket
      |> assign(:id, id)
      |> assign(:tempo, tempo)

      send(self, :after_join)

      {:ok, socket}
    end
  end

  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, Integer.to_string(socket.assigns.id), %{})
    push socket, "set_tempo", %{tempo: socket.assigns.tempo}
    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (user:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end
end
