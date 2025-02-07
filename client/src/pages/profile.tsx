import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Star, MapPin, Calendar, ExternalLink, Play, Briefcase } from "lucide-react";

const COMPLETED_JOBS = [
  {
    id: 1,
    title: "Web app needs CSS HTML JS page optimization",
    rating: 4.0,
    date: "Mar 27, 2020 - Aug 23, 2023",
    feedback: "Steven is a true professional! We were very happy with Steven's work and communication."
  },
  {
    id: 2,
    title: "Developer needed for creating a mobile app for a NonProfit",
    status: "in_progress",
    date: "Feb 5, 2023 - Present",
    private: true
  },
  {
    id: 3,
    title: "React and Javascript Software Engineering Coach / Tutor",
    rating: 4.0,
    date: "Mar 27, 2020 - Aug 23, 2023",
    feedback: "Thanks for helping with our project!"
  }
];

export default function Profile() {
  return (
    <div className="space-y-6 pb-20">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">Dmitro Landau</h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>4.8/5.0</span>
                </div>
                <div>$1.00/hr</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Bandung, Indonesia</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Joined March 2020</span>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Switch id="available" defaultChecked />
              <Label htmlFor="available">Available for work</Label>
            </div>

            <p className="text-muted-foreground mt-4">
              I am an experienced software developer/designer and currently work on contracts for major financial institutions. In my spare time I really enjoy working on my craft as a developer and helping people grow their business thru the web. I am also a seasoned sales professional with many years in B2B and have previously been a top sales representative for Mercedes Benz and Subaru of America dealers.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button variant="outline" className="gap-2">
              <Play className="h-4 w-4" />
              Play showreels
            </Button>
          </div>
          <div className="flex gap-4">
            {["Nike", "Microsoft", "Google"].map((company) => (
              <Badge key={company} variant="secondary">{company}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Work History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Badge variant="outline">Completed jobs (26)</Badge>
            <Badge variant="outline">In progress (4)</Badge>
          </div>
          <div className="space-y-6">
            {COMPLETED_JOBS.map((job) => (
              <div key={job.id} className="border-b pb-6">
                <h3 className="font-medium mb-2">{job.title}</h3>
                {"rating" in job && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Star className="h-4 w-4" />
                    <span>{job.rating}</span>
                  </div>
                )}
                <div className="text-sm text-muted-foreground mb-2">{job.date}</div>
                {"feedback" in job && <p className="text-sm italic">"{job.feedback}"</p>}
                {"private" in job && <p className="text-sm text-muted-foreground">Private earnings</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}