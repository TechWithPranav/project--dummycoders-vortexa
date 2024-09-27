import ImageUpload from "@/components/custom/ImageUpload";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Mediscan() {
  return (
    <main className="flex justify-center items-center min-h-screen flex-col space-y-4 bg-gray-50 p-6">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center mb-3">
            ⚕️ HealR.ai 🩺
          </CardTitle>
          <CardDescription className="text-center text-2xl font-bold">
            Your Personal Health Assistant 🤖
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <ImageUpload />
        </CardContent>
      </Card>
    </main>
  );
}
