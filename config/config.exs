# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :poeme, Poeme.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "fPAFYzyCrGJA4NtjWxbOqEqfG1IgPh9MuNEBG5A4vkww+U1HnVl3n3mg1lSi9glc",
  render_errors: [view: Poeme.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Poeme.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
