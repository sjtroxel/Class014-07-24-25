# frozen_string_literal: true

class BlogBlueprint < Blueprinter::Base
  identifier :id

  # fields :title, :content

  view :normal do
    fields :title, :content
    association :user, blueprint: UserBlueprint, view: :normal
  end
end
