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
    {:ok, socket}
  end

  def handle_in("get_tempo", _payload, socket) do
    ids = Presence.list(socket)
    |> Map.keys()
    |> Enum.map(&String.to_integer/1)

    if Enum.count(ids) > @max_metronomes do
      {:error, %{reason: "too many metronomes"}}
    else
      last_id = if Enum.empty?(ids), do: -1, else: Enum.max(ids)
      id = last_id + 1
      tempo = @tempos |> Enum.at(rem(id, Enum.count(@tempos)))
      socket = socket
      |> assign(:id, id)
      |> assign(:tempo, tempo)

      {:ok, _} = Presence.track(socket, Integer.to_string(socket.assigns.id), %{})

      {:reply, {:ok, %{tempo: tempo}}, socket}
    end
  end
end
