import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TrainingLogApp() {
  const [trainingType, setTrainingType] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [logs, setLogs] = useState([]);
  const [previousLog, setPreviousLog] = useState(null);

  useEffect(() => {
    if (trainingType) {
      const filteredLogs = logs.filter(log => log.trainingType === trainingType);
      if (filteredLogs.length > 0) {
        const latestLog = filteredLogs[filteredLogs.length - 1];
        setPreviousLog(latestLog);
      } else {
        setPreviousLog(null);
      }
    } else {
      setPreviousLog(null);
    }
  }, [trainingType, logs]);

  const handleAddLog = () => {
    if (trainingType && reps && sets) {
      const currentDate = new Date().toISOString().split("T")[0];
      setLogs([...logs, { trainingType, reps, sets, date: currentDate }]);
      setTrainingType("");
      setReps("");
      setSets("");
      setPreviousLog(null);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card className="mb-6">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">トレーニング記録入力</h2>
          <div>
            <Label>トレーニングの種類</Label>
            <Input value={trainingType} onChange={(e) => setTrainingType(e.target.value)} />
          </div>
          {previousLog && (
            <div className="text-sm text-gray-600">
              <p><strong>前回の記録:</strong> {previousLog.date}</p>
              <p>レップ数: {previousLog.reps}、セット数: {previousLog.sets}</p>
            </div>
          )}
          <div>
            <Label>レップ数</Label>
            <Input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
          </div>
          <div>
            <Label>セット数</Label>
            <Input type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
          </div>
          <Button onClick={handleAddLog}>記録する</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">記録一覧</h2>
          {logs.length === 0 ? (
            <p>まだ記録がありません。</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="border p-2 rounded">
                <p><strong>日付:</strong> {log.date}</p>
                <p><strong>トレーニング:</strong> {log.trainingType}</p>
                <p><strong>レップ数:</strong> {log.reps}</p>
                <p><strong>セット数:</strong> {log.sets}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
