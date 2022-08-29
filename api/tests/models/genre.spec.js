const { Genre, conn } = require("../../src/db");

describe("Genre Model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Genre.sync({ force: true }));
    describe("name and id", () => {
      it("should throw an error if name is null", (done) => {
        Genre.create({})
          .then(() => done(new Error("It requires a valid name and a id")))
          .catch(() => done());
      });
      it("should work when its a valid name and id", () => {
        Genre.create({
          id: "1eb976bc-ddf3-4594-8bfb-659d64e7fb30",
          name: "Mario",
          description: "Super mario is game very well known....",
          platform: ["Android", "Nintendo"],
        });
      });
    });
  });
});