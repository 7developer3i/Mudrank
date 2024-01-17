const express = require("express");
const router = express.Router();
const connection = require("../database");

const fetchInvestorData = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const query = "SELECT * FROM investor_users WHERE id = ?";

      connection.query(query, [req.query.id], (err, result) => {
        if (err) {
          console.error("Error fetching investors: ", err);
          reject({ status: 500, error: "Failed to fetch investors" });
          return;
        }

        if (result.length > 0) {
          if (result[0].token == req.query.token) {
            const query = "SELECT * FROM investor";
            connection.query(query, (err, results) => {
              if (err) {
                console.error("Error fetching investors: ", err);
                reject({ status: 500, error: "Failed to fetch investors" });
                return;
              }
              setTimeout(() => {
                resolve({ status: 200, data: results });
              }, 1000);
            });
          } else {
            reject({ status: 301, message: "Investor Token Invalid" });
          }
        } else {
          reject({ status: 200, message: "Investor Id Not Found" });
        }
      });
    } catch (error) {
      reject({ status: 500, error: "Internal Server Error" });
    }
  });
};

// all privacy route
const fetchPrivacyData = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      if (req.query.adminid) {
        const query = "SELECT * FROM user WHERE id = ?";
        connection.query(query, [req.query.adminid], (err, result) => {
          if (err) {
            reject({ status: 400, err });
          } else {
            if (result[0].token === req.query.token) {
              connection.query(
                "SELECT * FROM privacy_Table",
                (err, results) => {
                  if (err) {
                    reject({ status: 401, err });
                  } else {
                    resolve({ status: 200, data: results });
                  }
                }
              );
            } else {
              reject({ status: 400, error: "Invalid token or missing token" });
            }
          }
        });
      } else {
        connection.query("SELECT * FROM privacy_Table", (err, results) => {
          if (err) {
            reject({ status: 401, err });
          } else {
            resolve({ status: 200, data: results });
          }
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: error.error || "An error occurred" });
    }
  });
};

const fetchcreatePrivacyData = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const data = req.body;
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.body.adminid], (err, userResults) => {
        if (err) {
          reject({
            status: 500,
            error: "An error occurred while fetching user data",
          });
          return;
        }

        if (userResults[0] && userResults[0].token === req.body.token) {
          const sql =
            "INSERT INTO privacy_Table (para_item, content, created_date, is_deleted, status) VALUES (?, ?, NOW(), ?, ?)";

          connection.query(
            sql,
            [data.para_item, data.content, 0, "pending"],
            (error, insertResults) => {
              if (error) {
                reject({
                  status: 500,
                  error: "An error occurred while inserting data",
                });
              } else {
                console.log(
                  "Inserted a record with ID: " + insertResults.insertId
                );
                resolve({ status: 200, message: "Inserted a record" });
              }
            }
          );
        } else {
          reject({ status: 400, error: "Invalid token or missing token" });
        }
      });
    } catch (error) {
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetcheditPrivacyData = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const id = req.params.id;
      const newData = req.body;

      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [newData.adminid], (err, userResults) => {
        if (err) {
          console.error("Error fetching user data: ", err);
          reject({
            status: 500,
            error: "An error occurred while fetching user data",
          });
          return;
        }

        if (userResults[0] && userResults[0].token === newData.token) {
          const updateQuery =
            "UPDATE privacy_table SET para_item = ?, content = ? WHERE id = ?";

          connection.query(
            updateQuery,
            [newData.para_item, newData.content, id],
            (error, updateResults) => {
              if (error) {
                console.error("Error updating record: ", error);
                reject({
                  status: 500,
                  error: "An error occurred while updating the record",
                });
              } else {
                console.log("Updated the record with ID: " + id);
                resolve({ status: 200, message: "Updated the record" });
              }
            }
          );
        } else {
          reject({ status: 400, error: "Invalid token or missing token" });
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetchDeletePrivacyData = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const id = req.params.id;

      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.query.adminid], async (err, userResults) => {
        if (err) {
          console.error("Error fetching user data: ", err);
          reject({
            status: 500,
            error: "An error occurred while fetching user data",
          });
          return;
        }

        if (userResults[0] && userResults[0].token === req.query.token) {
          const deleteQuery = "DELETE FROM privacy_table WHERE id = ?";

          connection.query(deleteQuery, [id], (error, deleteResults) => {
            if (error) {
              console.error("Error deleting record: ", error);
              reject({
                status: 500,
                error: "An error occurred while deleting the record",
              });
            } else {
              console.log("Deleted the record with ID: " + id);
              resolve({ status: 200, message: "Deleted the record" });
            }
          });
        } else {
          reject({ status: 400, error: "Invalid token or missing token" });
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

// all about route
const fetchcreateaboutData = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = req.body;
      const query = "SELECT * FROM user WHERE id = ?";
      // const userResults = await new Promise((resolve, reject) => {
      connection.query(query, [req.body.adminid], (err, userResults) => {
        if (err) {
          reject(err);
        } else {
          if (userResults[0] && userResults[0].token == req.body.token) {
            const insertQuery =
              "INSERT INTO founder_table (image, textone, heading, paratext, created_date, is_deleted, status) VALUES (?, ?, ?, ?, NOW(), ?, ?)";
            connection.query(
              insertQuery,
              [
                req.file.path,
                data.fieldone,
                "founder",
                data.fieldtwo,
                0,
                "pending",
              ],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve({
                    status: 200,
                    message: "Record inserted successfully",
                  });
                }
              }
            );
          } else {
            reject({ status: 400, error: "Invalid token or missing token" });
          }
        }
      });
      // });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetchaboutData = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      if (req.query.adminid) {
        const query = "SELECT * FROM user WHERE id = ?";
        connection.query(query, [req.query.adminid], (err, result) => {
          if (err) {
            reject({
              status: 500,
              error: "An error occurred while fetching user data",
            });
          } else {
            if (result[0] && result[0].token === req.query.token) {
              connection.query(
                "SELECT * FROM founder_table",
                (err, results) => {
                  if (err) {
                    reject({
                      status: 500,
                      error: "An error occurred while fetching founder data",
                    });
                  } else {
                    resolve({ status: 200, data: results });
                  }
                }
              );
            } else {
              reject({ status: 400, error: "Invalid token or missing token" });
            }
          }
        });
      } else {
        connection.query("SELECT * FROM founder_table", (err, results) => {
          if (err) {
            reject({
              status: 500,
              error: "An error occurred while fetching founder data",
            });
          } else {
            resolve({ status: 200, data: results });
          }
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetcheditaboutData = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const newData = req.body;

      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.body.adminid], (err, result) => {
        if (err) {
          reject({
            status: 500,
            error: "An error occurred while fetching user data",
          });
        } else {
          if (result[0] && result[0].token == newData.token) {
            const updateQuery =
              "UPDATE founder_table SET image = ?,  textone = ?, heading = ?, paratext = ? WHERE id = ?";

            connection.query(
              updateQuery,
              [
                req.file.path,
                newData.textone,
                newData.heading,
                newData.paratext,
                newData.id,
              ],
              (error, updateResults) => {
                if (error) {
                  reject({
                    status: 500,
                    error: "An error occurred while updating data",
                  });
                } else {
                  resolve({
                    status: 200,
                    message: "Updated the record",
                    updateResults,
                  });
                }
              }
            );
          } else {
            reject({ status: 400, error: "Invalid token or missing token" });
          }
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetchdeleteaboutData = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = req.params.id;

      const query = "SELECT * FROM user WHERE id = ?";
      const userResults = await new Promise((resolve, reject) => {
        connection.query(query, [req.query.adminid], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      if (userResults[0] && userResults[0].token == req.query.token) {
        const deleteQuery = "DELETE FROM founder_table WHERE id = ?";

        const deleteResults = await new Promise((resolve, reject) => {
          connection.query(deleteQuery, [id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });

        console.log("Deleted the record with ID: " + id);
        resolve({ status: 200, message: "Deleted the record", deleteResults });
      } else {
        reject({ status: 400, error: "Invalid token or missing token" });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

// completed startup routes
const fetchcreateStartupData = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "SELECT * FROM user WHERE id = ?";
      // const userResults = await new Promise((resolve, reject) => {
      connection.query(query, [req.body.adminid], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result[0] && result[0].token == req.body.token) {
            const insertQuery =
              "INSERT INTO startup_table (Image, title, created_date, is_deleted, status) VALUES (?, ?, NOW(), ?, ?)";

            // const insertResults = await new Promise((resolve, reject) => {
            connection.query(
              insertQuery,
              [req.file.path, req.body.inputtitle, 0, "pending"],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve({ status: 200, message: "Inserted a record", results });
                }
              }
            );
            // });

          } else {
            reject({ status: 400, error: "Invalid token or missing token" });
          }
        }
      });

    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetchStartupData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (req.query.adminid) {
        const query = "SELECT * FROM user WHERE id = ?";
        connection.query(query, [req.query.adminid], (err, result) => {
          if (err) {
            reject({ status: 401, err });
          } else {
            if (result[0].token == req.query.token) {
              const selectQuery = "SELECT * FROM startup_table";
              connection.query(selectQuery, (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  resolve({ status: 200, data: results });
                }
              });
            } else {
              reject({ status: 400, error: "Invalid token or missing token" });
            }
          }
        });
      } else {
        const selectQuery = "SELECT * FROM startup_table";
        connection.query(selectQuery, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({ status: 200, data: results });
          }
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetcheditStartupData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.body.adminid], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result[0] && result[0].token == req.body.token) {
            const updateQuery =
              "UPDATE startup_table SET Image = ?, title = ? WHERE id = ?";
            connection.query(
              updateQuery,
              [req.file.path, newData.title, id],
              (error, results) => {
                if (error) {
                  reject({ status: 400, error });
                } else {
                  resolve({ status: 200, message: "Updated the record", });
                }
              }
            );
          } else {
            reject({ status: 400, error: "Invalid token or missing token" });
          }
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetchdeleteStartupData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = req.params.id;
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.query.adminid], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result[0] && result[0].token == req.query.token) {
            const deleteQuery = "DELETE FROM startup_table WHERE id = ?";
            connection.query(deleteQuery, [id], (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve({ status: 200, message: "Deleted Record" })
              }
            });
          } else {
            reject({ status: 400, error: "Invalid token or missing token" });
          }
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  })
};

// fundraising route
const fetchfundraisingData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (req.query.adminid) {
        const query = "SELECT * FROM user WHERE id = ?";
        connection.query(query, [req.query.adminid], (err, result) => {
          if (err) {
            reject({ status: 401, err });
          } else {
            if (result[0] && result[0].token == req.query.token) {
              const selectQuery = "SELECT * FROM fundraising_table";
              connection.query(selectQuery, (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  resolve({ status: 200, data: results });
                }
              });
            } else {
              reject({ status: 400, error: "Invalid token or missing token" });
            }
          }
        });
      } else {
        const selectQuery = "SELECT * FROM fundraising_table";
        connection.query(selectQuery, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({ status: 200, data: results });
          }
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetchcreatefundraisingData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.body.adminid], (err, result) => {
        if (err) {
          reject({
            status: 500,
            error: "An error occurred while fetching user data",
          });
        } else {
          if (result[0] && result[0].token == req.body.token) {
            const insertQuery = `INSERT INTO fundraising_table (Image, title, paragraph, created_date, is_deleted, status) VALUES (?, ?, ?, NOW(), ?, ?)`;
            connection.query(
              insertQuery,
              [
                req.file.path,
                req.body.fieldtitle,
                req.body.fieldPara,
                0,
                "Active",
              ],
              (error, results) => {
                if (error) {
                  reject({ status: 500, error: "An error occurred while inserting data" });
                } else {
                  resolve({ status: 200, message: "Inserted a record", results });
                }
              }
            );
          } else {
            reject({ status: 400, error: "Invalid token or missing token" });
          }
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetcheditfundraisingData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.body.adminid], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result[0] && result[0].token == req.body.token) {
            const updateQuery =
              "UPDATE fundraising_table SET Image = ?, title = ?, paragraph = ? WHERE id = ?";

            connection.query(
              updateQuery,
              [req.file.path, req.body.title, req.body.paragraph, req.body.id],
              (error, results) => {
                if (error) {
                  reject({ status: 401, error });
                } else {
                  resolve({ status: 200, message: "Updated the record", results });
                }
              }
            );
          } else {
            reject({ status: 400, error: "Invalid token or missing token" });
          }
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetchDeletefundraisingData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "SELECT * FROM user WHERE id = ?";
      const id = req.params.id;
      connection.query(query, [req.query.adminid], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result[0] && result[0].token == req.query.token) {
            const deleteQuery = "DELETE FROM fundraising_table WHERE id = ?";
            connection.query(deleteQuery, [id], (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve({ status: 200, message: "Deleted the record" });
              }
            });
          } else {
            reject({ status: 400, error: "Invalid token or missing token" });
          }
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

// browse route
const fetchbrowseData = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      if (req.query.adminid) {
        const query = `SELECT * FROM user WHERE id = ?`;
        connection.query(query, [req.query.adminid], (err, result) => {
          if (err) {
            console.error("Error fetching user data: ", err);
            reject({
              status: 500,
              error: "An error occurred while fetching user data",
            });
          }

          if (result[0] && result[0].token == req.query.token) {
            connection.query(
              "SELECT * FROM browse_table",
              (err, results, fields) => {
                if (err) {
                  console.error("Error executing query:", err);
                  reject({ status: 500, error: "An error occurred" });
                } else {
                  resolve({ status: 200, data: results });
                }
              }
            );
          } else {
            reject({ status: 400, error: "Invalid token or missing token" });
          }
        });
      } else {
        connection.query(
          "SELECT * FROM browse_table",
          (err, results, fields) => {
            if (err) {
              console.error("Error executing query:", err);
              reject({ status: 500, error: "An error occurred" });
            } else {
              resolve({ status: 200, data: results });
            }
          }
        );
      }
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetchcreatebrowseData = async (req, res) => {
  const cardId = req.params.id;
  return new Promise((resolve, reject) => {
    try {
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.body.adminid], (err, result) => {
        if (err) {
          console.error("Error fetching user data: ", err);
          reject({
            status: 500,
            error: "An error occurred while fetching user data",
          });
        }

        if (result[0] && result[0].token === req.body.token) {
          connection.beginTransaction((err) => {
            if (err) {
              console.error("Error starting transaction: " + err);
              reject({ status: 500, error: "Error starting transaction" });
            }

            // Delete the record from browse_Table (describe_item and title)
            const deleteBrowseQuery = "DELETE FROM browse_table WHERE id = ?";

            connection.query(
              deleteBrowseQuery,
              [cardId],
              (error, browseResult) => {
                if (error) {
                  connection.rollback(() => {
                    console.error(
                      "Error deleting describe_item and title: " + error
                    );
                    reject({
                      status: 500,
                      error: "Error deleting describe_item and title",
                    });
                  });
                } else {
                  // Commit the transaction if the deletion is successful
                  const deleteQuery =
                    "DELETE FROM frequently_table WHERE browse_id = ?";
                  connection.query(deleteQuery, [cardId], (error, results) => {
                    if (error) {
                      connection.rollback(() => {
                        console.error("Error deleting data: " + error);
                        reject({ status: 500, error: "Error deleting data" });
                      });
                    } else {
                      connection.commit((err) => {
                        if (err) {
                          connection.rollback(() => {
                            console.error(
                              "Error committing transaction: " + err
                            );
                            reject({
                              status: 500,
                              error: "Error committing transaction",
                            });
                          });
                        } else {
                          console.log("Transaction successfully completed.");
                          resolve({
                            status: 200,
                            message: "Deleted the four items in record",
                          });
                        }
                      });
                    }
                  });
                }
              }
            );
          });
        } else {
          reject({ status: 400, error: "Invalid token or missing token" });
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetcheditbrowseData = async (req, res) => {
  const newData = req.body;
  const id = req.params.id;
  return new Promise((resolve, reject) => {
    try {
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.body.adminid], (err, result) => {
        if (err) {
          console.error("Error fetching user data: ", err);
          reject({
            status: 500,
            error: "An error occurred while fetching user data",
          });
        }
        if (result[0] && result[0].token === req.body.token) {
          const updateQuery =
            "UPDATE browse_table SET describe_item = ?, title = ? WHERE id = ?";
          connection.query(
            updateQuery,
            [newData.describe_item, newData.title, id],
            (error, results) => {
              if (error) {
                console.error("Error updating data: " + error);
                reject({ status: 500, error: "Error updating data" });
              } else {
                const updateQuery =
                  "UPDATE frequently_table SET question = ?, answer = ? WHERE browse_id = ?";
                connection.query(
                  updateQuery,
                  [newData.question, newData.answer, id],
                  (error, results) => {
                    if (error) {
                      console.error("Error updating data: " + error);
                      reject({ status: 500, error: "Error updating data" });
                    } else {
                      resolve({ status: 200, message: "Updated the record" });
                    }
                  }
                );
              }
            }
          );
        } else {
          reject({ status: 400, error: "Invalid token or missing token" });
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetchdeletebrowseData = async (req, res) => {
  const cardId = req.params.id;
  return new Promise((resolve, reject) => {
    try {
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.query.adminId], (err, result) => {
        if (err) {
          console.error("Error fetching user data: ", err);
          reject({
            status: 500,
            error: "An error occurred while fetching user data",
          });
          return;
        }

        if (result[0] && result[0].token === req.query.token) {
          connection.beginTransaction((err) => {
            if (err) {
              console.error("Error starting transaction: " + err);
              reject({ status: 500, error: "Error starting transaction" });
              return;
            }

            const deleteBrowseQuery = "DELETE FROM browse_table WHERE id = ?";

            connection.query(
              deleteBrowseQuery,
              [cardId],
              (error, browseResult) => {
                if (error) {
                  connection.rollback(() => {
                    console.error(
                      "Error deleting describe_item and title: " + error
                    );
                    reject({
                      status: 500,
                      error: "Error deleting describe_item and title",
                    });
                  });
                } else {
                  // Commit the transaction if the deletion is successful
                  const deleteQuery =
                    "DELETE FROM frequently_table WHERE browse_id = ?";
                  connection.query(deleteQuery, [cardId], (error, results) => {
                    if (error) {
                      connection.rollback(() => {
                        console.error("Error deleting data: " + error);
                        reject({ status: 500, error: "Error deleting data" });
                      });
                    } else {
                      connection.commit((err) => {
                        if (err) {
                          connection.rollback(() => {
                            console.error(
                              "Error committing transaction: " + err
                            );
                            reject({
                              status: 500,
                              error: "Error committing transaction",
                            });
                          });
                        } else {
                          console.log("Transaction successfully completed.");
                          resolve({
                            status: 200,
                            message: "Deleted the four items in record",
                          });
                        }
                      });
                    }
                  });
                }
              }
            );
          });
        } else {
          reject({ status: 400, error: "Invalid token or missing token" });
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

// faq Route

const fetchfaqData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (req.query.adminid) {
        const query = "SELECT * FROM user WHERE id = ?";
        connection.query(query, [req.query.adminid], (err, result) => {
          if (err) {
            reject(err);
          } else {
            // resolve(result);
            if (result[0] && result[0].token == req.query.token) {
              const selectQuery = "SELECT * FROM faq_Table";
              connection.query(selectQuery, (err, results, fields) => {
                if (err) {
                  reject(err);
                } else {
                  resolve({ status: 200, data: results });
                }
              });
            } else {
              res.status(400).json({ error: "Invalid token or missing token" });
            }
          }
        });
      } else {
        const selectQuery = "SELECT * FROM faq_Table";
        connection.query(selectQuery, (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve({ status: 200, data: results });
          }
        });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  });
};

const fetchcreatefaqData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.body.adminid], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result[0] && result[0].token == req.body.token) {
            const insertQuery = `INSERT INTO faq_Table (question, answer, created_date, is_deleted, status) VALUES (?, ?, NOW(), ?, ?)`;
            connection.query(
              insertQuery,
              [req.body.question, req.body.answer, 0, "Active"],
              (error, results) => {
                if (error) {
                  reject({ status: 401, error });
                } else {
                  resolve({ status: 200, data: results });
                }
              }
            );
          } else {
            reject({ status: 400, error: "Invalid token or missing token" });
          }
        }
      });

    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  })
};

const fetcheditfaqData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = req.params.id;
      const newData = req.body;
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.body.adminid], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result[0] && result[0].token == req.body.token) {
            const updateQuery =
              "UPDATE faq_Table SET question = ?, answer = ? WHERE id = ?";
            connection.query(
              updateQuery,
              [newData.question, newData.answer, id],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve({ status: 200, message: "data updated" });
                }
              }
            );
          } else {
            reject({ status: 401, error: "Invalid token or missing token" });
          }
        }
      });

    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  })
};

const fetchdeletefaqData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = req.params.id;
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.query.adminid], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result[0] && result[0].token == req.query.token) {
            const deleteQuery = "DELETE FROM faq_Table WHERE id = ?";
            connection.query(deleteQuery, [id], (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve({ status: 200, message: "deleted faq table" });
              }
            });
          } else {
            reject({ status: 401, message: "Invalid token or missing token" });
          }
        }
      });

    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  })
};

// freq section Route

const fetchcreatefreqData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = req.body;
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.body.adminid], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result[0] && result[0].token == req.body.token) {
            const insertQuery = `INSERT INTO frequently_table (question, answer, created_date, is_deleted, status) VALUES (?, ?, NOW(), ?, ?)`;
            connection.query(
              insertQuery,
              [data.question, data.answer, 0, "Active"],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve({ status: 200, message: "Inserted a record" });
                }
              }
            );
          } else {
            reject({ status: 401, message: "missing token" });
          }
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  })
};

const fetchfreqData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (req.query.adminid) {
        const query = "SELECT * FROM user WHERE id = ?";
        connection.query(query, [req.query.adminid], (err, result) => {
          if (err) {
            reject({ status: 401, error: err });
          } else {
            if (result[0] && result[0].token == req.query.token) {
              const selectQuery = "SELECT * FROM frequently_table";
              connection.query(selectQuery, (err, results) => {
                if (err) {
                  reject({ status: 500, error: err });
                } else {
                  resolve({ status: 200, data: results });
                }
              });
            } else {
              reject({ status: 400, message: "Missing token" });
            }
          }
        });
      } else {
        const selectQuery = "SELECT * FROM frequently_table";
        connection.query(selectQuery, (err, results) => {
          if (err) {
            reject({ status: 500, error: err });
          } else {
            resolve({ status: 200, data: results });
          }
        });
      }
    } catch (error) {
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetcheditfreqData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = req.params.id;
      const newData = req.body;
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [newData.adminid], (err, result) => {
        if (err) {
          throw err;
        }
        if (result[0].token == newData.token) {
          const updateQuery =
            "UPDATE frequently_table SET question = ?, answer = ? WHERE id = ?";
          connection.query(
            updateQuery,
            [newData.question, newData.answer, id],
            (error, results) => {
              if (error) {
                console.error("Error updating data: " + error);
                reject({ status: 500, error: "Error updating data" });
              } else {
                console.log("Updated the record with ID: " + id);
                resolve({ status: 200, message: "Updated the record" });
              }
            }
          );
        } else {
          reject({ status: 400, message: "token missing" });
        }
      });
    } catch (error) {
      reject({ status: 401, error: "An error occurred" });
    }
  });
};

const fetchdeletefreqData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = req.params.id;
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.query.adminid], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result[0] && result[0].token == req.query.token) {
            const deleteQuery = "DELETE FROM frequently_table WHERE id = ?";
            connection.query(deleteQuery, [id], (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve({ status: 200, message: "Deleted the record" });
              }
            });
          } else {
            resolve({ status: 400, message: "missing token" });
          }
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

// footer route

const fetchcreatefooterData = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = req.body;
      const insertQuery =
        "INSERT INTO footertwo_data (name, created_date, is_deleted, status) VALUES (?, NOW(), ?, ?)";
      connection.query(
        insertQuery,
        [JSON.stringify(data.name), 0, "Active"],
        (error, results) => {
          if (error) {
            reject({ status: 400, error: "An error occurred" });
          } else {
            resolve({
              status: 200,
              message: "Inserted a record",
              results,
            });
          }
        }
      );
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetchfooterData = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      if (req.query.adminid) {
        const query = "SELECT * FROM user WHERE id = ?";
        connection.query(query, [req.query.adminid], (err, result) => {
          if (err) {
            reject({ status: 401, error: err });
          } else {
            const selectQuery = "SELECT * FROM footertwo_data";
            if (result[0].token == req.query.token) {
              connection.query(selectQuery, (error, results) => {
                if (error) {
                  reject({ status: 401, error });
                } else {
                  resolve({ status: 200, data: results });
                }
              });
            } else {
              reject({ status: 301, message: "Token Missing" });
            }
          }
        });
      } else {
        const selectQuery = "SELECT * FROM footertwo_data";
        connection.query(selectQuery, (error, results) => {
          if (error) {
            reject({ status: 401, error });
          } else {
            resolve({ status: 200, data: results });
          }
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetcheditfooterData = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const id = req.params.id; // Get the ID from the request parameters
      const updatedData = req.body; // Updated data sent in the request body
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [updatedData.adminid], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result[0].token == req.body.token) {
            if (updatedData.name) {
              const datas = JSON.stringify(updatedData.name);
              // Define the UPDATE query
              const updateQuery = "UPDATE footertwo_data SET name = ? WHERE id = ?";
              connection.query(updateQuery, [datas, id], (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve({ status: 200, message: "update record" });
                }
              });
            } else {
              reject({ status: 401, message: "Missing or invalid token" });
            }
          }
        }
      })

    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  })
};

const fetchdeletefooterData = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const id = req.params.id;
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.query.adminid], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result[0].token == req.query.token) {
            const deleteQuery = "DELETE FROM footertwo_data WHERE id = ?";
            connection.query(deleteQuery, [id], (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve({ status: 200, message: "Deleted footer data" });
              }
            });
          } else {
            reject({ status: 401, message: "Missing or invalid token" });
          }
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  })
};

// about route
const fetchcreatesendhtmlData = async (req, res) => {
  try {
    // Define your HTML structure
    const htmlContent = `
      <section className="whatis abt_us">
        <div className="bcontainer">
          <div className="what_banner">
            <div className="inner_container">
              <div className="what_head">
                <h4>About Us</h4>
                <h5>
                  Lorem ipsum dolor sit amet. Cum officia molestias aut obcaecati
                  quia ut sint culpa in quia ratione ut repellat sunt. Ut beatae
                  accusantium id accusantium tenetur eos neque voluptas
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // Save the HTML content to the database
    const insertQuery = "INSERT INTO aboutpage_Table (content) VALUES (?)";

    const insertResult = await new Promise((resolve, reject) => {
      connection.query(insertQuery, [htmlContent], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    console.log("Inserted a record with ID: " + insertResult.insertId);
    res.status(201).json({ message: "Inserted a record" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const fetchsendhtmlData = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const selectQuery = "SELECT content FROM aboutpage_Table";
      // const results = await new Promise((resolve, reject) => {
      connection.query(selectQuery, (error, results) => {
        if (error) {
          reject({ status: 401, error });
        } else {
          if (results.length > 0) {
            const htmlContent = results[0].content;
            resolve({ content: htmlContent });
          } else {
            reject({ status: 301, error: "No data found" });
          }
        }
      });
      // });
    } catch (error) {
      console.error("Error occurred:", error);
      reject({ status: 500, error: "An error occurred" });
    }
  });
};

const fetcheditsendhtmlData = async (req, res) => {
  try {
    const id = req.params.id;
    // Extract the updated HTML content from the request body
    const updatedHtmlContent = req.body.content;

    // Define the SQL update query
    const updateQuery = "UPDATE aboutpage_Table SET content = ? WHERE id = ?";

    // Execute the query to update the HTML content
    const results = await new Promise((resolve, reject) => {
      connection.query(
        updateQuery,
        [updatedHtmlContent, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (results.affectedRows > 0) {
      res.status(200).json({ message: "HTML content updated successfully" });
    } else {
      res.status(404).json({ error: "No data found for update" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// mission table route
const fechcreatemissionData = async (req, res) => {
  try {
    // Define your HTML structure
    const htmlContent = `
      <section className="our_mission mrg77">
        <div className="bcontainer">
          <div className="our_mission_inner inner_container">
            <h5 className="prm">Our Mission</h5>
            <h6 className="wclr">
              // ... (Your Lorem Ipsum content)
            </h6>
          </div>
        </div>
      </section>
    `;
    const insertQuery = "INSERT INTO mission_Table (content) VALUES (?)";
    const [results] = await connection.query(insertQuery, [htmlContent]);
    console.log("Inserted a record with ID: " + results.insertId);
    res.status(201).json({ message: "Inserted a record" });
  } catch (error) {
    console.error("Error in POST /mission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchmissionData = async (req, res) => {
  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT content FROM mission_Table";

    connection.query(selectQuery, (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length > 0) {
          const htmlContent = results[0].content;
          resolve({ status: 200, data: htmlContent });
        } else {
          reject({ error: "No data found" });
        }
      }
    });
  });
};

const fetcheditmissionData = async (req, res) => {
  return new Promise((resolve, reject) => {
    const id = req.params.id;
    const updatedHtmlContent = req.body.content;

    const updateQuery = "UPDATE mission_Table SET content = ? WHERE id = ?";

    connection.query(
      updateQuery,
      [updatedHtmlContent, id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.affectedRows > 0) {
            resolve({ message: "HTML content updated successfully" });
          } else {
            reject({ error: "No data found for update" });
          }
        }
      }
    );
  });
};

// curated route

const fetchcreatecuratedData = async (req, res) => {
  return new Promise((resolve, reject) => {
    const data = req.body;
    const query = "SELECT * FROM user WHERE id = ?";
    connection.query(query, [req.body.adminid], (err, result) => {
      if (err) {
        reject({ error: "Failed to fetch investors" });
        return;
      }
      if (result[0].token == req.body.token) {
        const insertDataQuery =
          "INSERT INTO curated_Table (title, text) VALUES (?, ?)";

        connection.query(
          insertDataQuery,
          [data.title, data.text],
          (err, results) => {
            if (err) {
              reject({ error: "Error inserting data" });
            } else {
              resolve({ status: 200, data: results });
            }
          }
        );
      } else {
        reject({ error: "Missing token" });
      }
    });
  });
};

const fetchcuratedData = async (req, res) => {
  return new Promise((resolve, reject) => {
    if (req.query.adminid) {
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [req.query.adminid], (err, result) => {
        if (err) {
          reject({ status: 500, error: "Failed to fetch investors" });
          return;
        }

        if (result[0] && result[0].token == req.query.token) {
          const selectQuery = "SELECT * FROM curated_Table";
          connection.query(selectQuery, (err, results) => {
            if (err) {
              reject({ status: 500, error: "Error retrieving data" });
            } else {
              resolve({ status: 200, data: results });
            }
          });
        } else {
          reject({ status: 400, error: "Missing token" });
        }
      });
    } else {
      const selectQuery = "SELECT * FROM curated_Table";
      connection.query(selectQuery, (err, results) => {
        if (err) {
          reject({ status: 500, error: "Error retrieving data" });
        } else {
          resolve({ status: 200, data: results });
        }
      });
    }
  });
};

const fetcheditcuatedData = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const newData = req.body;
      const id = req.params.id;
      const query = "SELECT * FROM user WHERE id = ?";
      connection.query(query, [newData.adminid], (err, result) => {
        if (err) {
          reject({ error: "Failed to fetch investors" });
        }
        if (result[0].token == newData.token) {
          const updateQuery =
            "UPDATE curated_Table SET title = ?, text = ? WHERE id = ?";
          connection.query(
            updateQuery,
            [newData.title, newData.text, id],
            (error, results) => {
              if (error) {
                reject({ error: "Error updating data" });
              } else {
                resolve({
                  message: "Updated the record",
                  status: 200,
                });
              }
            }
          );
        } else {
          reject({ error: "Missing token" });
        }
      });
    } catch (error) {
      reject({ status: 500, message: "Internal Server Error" })
    }
  });
};

const fetchdeletecuratedData = async (req, res) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM user WHERE id = ?";
    connection.query(query, [req.query.adminid], (err, result) => {
      if (err) {
        reject({ error: "Failed to fetch investors" });
        return;
      }

      const id = req.params.id;
      if (result[0].token == req.query.token) {
        const deleteQuery = "DELETE FROM curated_Table WHERE id = ?";

        connection.query(deleteQuery, [id], (error, results) => {
          if (error) {
            reject({ error: "Error deleting data" });
          } else {
            resolve({ status: 200, message: "Deleted the record" });
          }
        });
      } else {
        reject({ error: "Missing token" });
      }
    });
  });
};

module.exports = {
  fetchInvestorData,
  fetchPrivacyData,
  fetchcreatePrivacyData,
  fetcheditPrivacyData,
  fetchDeletePrivacyData,
  fetchcreateaboutData,
  fetchaboutData,
  fetcheditaboutData,
  fetchdeleteaboutData,
  fetchcreateStartupData,
  fetchStartupData,
  fetcheditStartupData,
  fetchdeleteStartupData,
  fetchfundraisingData,
  fetchcreatefundraisingData,
  fetcheditfundraisingData,
  fetchDeletefundraisingData,
  fetchbrowseData,
  fetcheditbrowseData,
  fetchdeletebrowseData,
  fetchcreatebrowseData,
  fetchfaqData,
  fetchcreatefaqData,
  fetcheditfaqData,
  fetchdeletefaqData,
  fetchcreatefreqData,
  fetchfreqData,
  fetcheditfreqData,
  fetchdeletefreqData,
  fetchfooterData,
  fetchcreatefooterData,
  fetcheditfooterData,
  fetchdeletefooterData,
  fetchcreatesendhtmlData,
  fetchsendhtmlData,
  fetcheditsendhtmlData,
  fechcreatemissionData,
  fetchmissionData,
  fetcheditmissionData,
  fetchcreatecuratedData,
  fetchcuratedData,
  fetcheditcuatedData,
  fetchdeletecuratedData,
};
