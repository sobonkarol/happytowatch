// cypress/integration/moodFilm.spec.js

describe("MoodFilm App Regression Test", () => {
  beforeEach(() => {
    cy.visit("https://moodfilm.netlify.app/");
  });

  context("Mood Selection", () => {
    it("should display a warning when more than two moods are selected", () => {
      // Given the user has selected the first mood
      cy.get(".mood-button .btn-outline-light").first().click();

      // And the user selects a second mood
      cy.get(".mood-button .btn-outline-light").eq(1).click();

      // When the user attempts to select a third mood
      cy.get(".mood-button .btn-outline-light").eq(2).click();

      // Then a warning should appear
      cy.contains("Możesz wybrać maksymalnie dwa nastroje.").should(
        "be.visible"
      );
    });

    it("should require at least one mood to be selected", () => {
      // Given the user has not selected any mood

      // When the user attempts to search
      cy.get("button").contains("Wyszukaj").click();

      // Then a warning should appear
      cy.contains("Wybierz przynajmniej jeden nastrój.").should("be.visible");
    });

    it("should allow search with at least one mood selected", () => {
      // And selects a platform
      cy.get(".platform-button .btn-outline-light").first().click();

      // Given the user selects a mood
      cy.get(".mood-button .btn-outline-light").contains("Sci-Fi").click();

      // When the user searches for movies
      cy.get("button").contains("Wyszukaj").click();

      // Then a movie suggestion modal should appear
      cy.get(".modal").should("be.visible");
    });
  });

  context("Platform Selection", () => {
    it("should require at least one platform to be selected", () => {
      // Given the user has selected a mood
      cy.get(".mood-button .btn-outline-light").first().click();

      // When the user attempts to search without selecting a platform
      cy.get("button").contains("Wyszukaj").click();

      // Then a warning should appear
      cy.contains("Wybierz przynajmniej jedną platformę streamingową.").should(
        "be.visible"
      );
    });

    it("should allow search with at least one platform selected", () => {
      // Given the user selects a mood
      cy.get(".mood-button .btn-outline-light").first().click();

      // And selects a platform
      cy.get(".platform-button .btn-outline-light").first().click();

      // When the user searches for movies
      cy.get("button").contains("Wyszukaj").click();

      // Then a movie suggestion modal should appear
      cy.get(".modal").should("be.visible");
    });
  });

  context("Movie Search", () => {
    it("should fetch movies successfully with valid inputs", () => {
      // Given the user has selected a mood and a platform
      cy.get(".mood-button .btn-outline-light").first().click();
      cy.get(".platform-button .btn-outline-light").first().click();

      // When the user searches for movies
      cy.get("button").contains("Wyszukaj").click();

      // Then a movie suggestion modal should appear
      cy.get(".modal").should("be.visible");
    });

    it("should toggle include animation correctly", () => {
      // Given the user has selected moods and platforms
      cy.get(".mood-button .btn-outline-light").first().click();
      cy.get(".platform-button .btn-outline-light").first().click();

      // When the user toggles include animation
      cy.get('input[type="checkbox"]').check();

      // And searches for movies
      cy.get("button").contains("Wyszukaj").click();

      // Then movies including animation should be displayed
      cy.get(".modal").should("be.visible");
    });

    it("should handle API errors gracefully", () => {
      // Given the API returns an error
      cy.intercept(
        "GET",
        "3/discover/movie?api_key=f444a77f642f0982dbc23fda35d86cf6&language=pl-PL&sort_by=popularity.desc&include_adult=true&page=1&with_genres=35&without_genres=16&watch_region=PL",
        (req) => {
          console.log("Intercepted request:", req); // Debugging log
          req.reply({
            statusCode: 500,
            body: { error: "Internal Server Error" },
          });
        }
      ).as("getMoviesError");

      // And the user has selected moods and platforms
      cy.get(".mood-button .btn-outline-light").first().click();
      cy.get(".platform-button .btn-outline-light").first().click();

      // When the user searches for movies
      cy.get("button").contains("Wyszukaj").click();

      // Then an error toast should appear
      cy.wait("@getMoviesError");
      cy.contains(
        "Wystąpił błąd podczas wyszukiwania filmów. Spróbuj ponownie!"
      ).should("be.visible");
    });

    it("should show loading spinner during movie fetching", () => {
      // Given the API response is delayed
      cy.intercept("GET", "**/discover/movie", (req) => {
        req.reply((res) => {
          res.delay(2000);
        });
      });

      // And the user has selected moods and platforms
      cy.get(".mood-button .btn-outline-light").first().click();
      cy.get(".platform-button .btn-outline-light").first().click();

      // When the user searches for movies
      cy.get("button").contains("Wyszukaj").click();

      // Then a loading spinner should be visible
      cy.get(".loading-overlay").should("be.visible");
    });

    it("should handle no movies found gracefully", () => {
      // Given no movies match the selected mood combination
      cy.intercept("GET", "**/discover/movie*with_genres=878,36*", {
        body: { results: [] },
      }).as("getNoMovies");

      // And the user has selected moods that typically result in no matches (sci-fi and nostalgic)
      cy.get(".mood-button .btn-outline-light").contains("Sci-Fi").click();
      cy.get(".mood-button .btn-outline-light")
        .contains("Nostalgiczny")
        .click();

      // And the user selects a platform
      cy.get(".platform-button .btn-outline-light").first().click();

      // When the user searches for movies
      cy.get("button").contains("Wyszukaj").click();

      // Then an info toast should appear
      cy.wait("@getNoMovies");
      cy.contains("Nie znaleziono filmów spełniających kryteria.").should(
        "be.visible"
      );
    });

    it("should allow next movie suggestion", () => {
      // Given the user has selected moods and platforms
      cy.get(".mood-button .btn-outline-light").first().click();
      cy.get(".platform-button .btn-outline-light").first().click();

      // When the user searches for movies
      cy.get("button").contains("Wyszukaj").click();

      // Then a movie suggestion modal should appear
      cy.get(".modal").should("be.visible");

      // When the user clicks "Next Suggestion" button
      cy.get("button").contains("Coś innego!").click();

      // Then a different movie should be suggested
      cy.get(".modal-content").then((initialContent) => {
        cy.get("button").contains("Coś innego!").click();
        cy.get(".modal-content").should("not.have.text", initialContent.text());
      });
    });

    it("should display toast messages correctly", () => {
      // Given the user has selected a mood
      cy.get(".mood-button .btn-outline-light").first().click();

      // When the user searches without selecting platforms
      cy.get("button").contains("Wyszukaj").click();

      // Then toast messages should be displayed
      cy.get(".Toastify__toast").should("have.length.at.least", 1);
    });
  });

  context("Responsive Design", () => {
    it("should display correctly on desktop", () => {
      // Given a desktop viewport
      cy.viewport(1280, 720);

      // Then the app should be visible
      cy.get(".App").should("be.visible");
    });

    it("should display correctly on tablet", () => {
      // Given a tablet viewport
      cy.viewport(768, 1024);

      // Then the app should be visible
      cy.get(".App").should("be.visible");
    });

    it("should display correctly on mobile", () => {
      // Given a mobile viewport
      cy.viewport(375, 667);

      // Then the app should be visible
      cy.get(".App").should("be.visible");
    });
  });
});
