import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, VolumeOff, SquareArrowOutUpRight } from "lucide-react";

export default function Theme() {
    return (
        <main className="h-full overflow-y-auto">
            <p className="pb-8">
                Icons
            </p>
            <div className="flex gap-8">
                <Volume2 size={48}/>
                <VolumeOff size={48}/>
                <SquareArrowOutUpRight size={48}/>
            </div>


            <div className="py-16">
                <hr/>
            </div>

            <p className="pb-8">
                Colors
            </p>
            <div className="flex gap-8">
                <div className="w-8 h-8 rounded-md border border-white/10 bg-holi-50"></div>
                <div className="w-8 h-8 rounded-md border border-white/10 bg-holi-100"></div>
                <div className="w-8 h-8 rounded-md border border-white/10 bg-holi-200"></div>
                <div className="w-8 h-8 rounded-md border border-white/10 bg-holi-300"></div>
                <div className="w-8 h-8 rounded-md border border-white/10 bg-holi-400"></div>
                <div className="w-8 h-8 rounded-md border border-white/10 bg-holi-500"></div>
                <div className="w-8 h-8 rounded-md border border-white/10 bg-holi-600"></div>
                <div className="w-8 h-8 rounded-md border border-white/10 bg-holi-700"></div>
                <div className="w-8 h-8 rounded-md border border-white/10 bg-holi-800"></div>
                <div className="w-8 h-8 rounded-md border border-white/10 bg-holi-900"></div>
                <div className="w-8 h-8 rounded-md border border-white/10 bg-holi-950"></div>
            </div>
            <div className="py-16">
                <hr/>
            </div>
            <p className="pb-8">
                Button Filled Icon
            </p>
            <div className="flex gap-8">
                <Button size="xs">Lorem Ipsum<ArrowRight/></Button>
                <Button size="sm">Lorem Ipsum<ArrowRight/> </Button>
                <Button size="md">Lorem Ipsum<ArrowRight/></Button>
                <Button size="lg">Lorem Ipsum<ArrowRight/></Button>
                <Button size="xl">Lorem Ipsum<ArrowRight/></Button>
            </div>
            <div className="py-16">
                <hr/>
            </div>
            <p className="pb-8">
                Button Filled
            </p>
            <div className="flex gap-8">
                <Button size="xs">Lorem Ipsum</Button>
                <Button size="sm">Lorem Ipsum </Button>
                <Button size="md">Lorem Ipsum</Button>
                <Button size="lg">Lorem Ipsum</Button>
                <Button size="xl">Lorem Ipsum</Button>
            </div>

            <div className="py-16">
                <hr/>
            </div>

            <p className="pb-8">
                Button Outline Icon
            </p>
            <div className="flex gap-8">
                <Button size="xs" variant="outline">Lorem Ipsum<ArrowRight/></Button>
                <Button size="sm" variant="outline">Lorem Ipsum<ArrowRight/> </Button>
                <Button size="md" variant="outline">Lorem Ipsum<ArrowRight/></Button>
                <Button size="lg" variant="outline">Lorem Ipsum<ArrowRight/></Button>
                <Button size="xl" variant="outline">Lorem Ipsum<ArrowRight/></Button>
            </div>
            <div className="py-16">
                <hr/>
            </div>

            <p className="pb-8">
                Button Outline
            </p>
            <div className="flex gap-8">
                <Button size="xs" variant="outline">Lorem Ipsum</Button>
                <Button size="sm" variant="outline">Lorem Ipsum </Button>
                <Button size="md" variant="outline">Lorem Ipsum</Button>
                <Button size="lg" variant="outline">Lorem Ipsum</Button>
                <Button size="xl" variant="outline">Lorem Ipsum</Button>
            </div>

        </main>
    );
}