const { spawn } = require("child_process");
const path = require("path");

const processTask = (req, res) => {
  const { task } = req.body;

  if (!task || !task.trim()) {
    return res.status(400).json({
      error: "Task is required"
    });
  }

  const pythonScript = path.join(
    __dirname,
    "../../ai-engine/api.py"
  );

  const pythonProcess = spawn("python", [pythonScript]);

  let output = "";
  let errorOutput = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.error("Python AEGIS error:", errorOutput);

      return res.status(500).json({
        error: "AEGIS AI engine failed",
        details: errorOutput
      });
    }

    try {
      const result = JSON.parse(output);

      if (result.error) {
        return res.status(500).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error("Invalid Python response:", output);

      return res.status(500).json({
        error: "Invalid response from AEGIS AI engine"
      });
    }
  });

  pythonProcess.stdin.write(
    JSON.stringify({ task })
  );

  pythonProcess.stdin.end();
};

module.exports = {
  processTask
};
