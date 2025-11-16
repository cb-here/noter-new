import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import NotesCard from "@/components/dashboard/NotesCard";
import TimerCard from "@/components/dashboard/TimerCard";
import QuickLinksCard from "@/components/dashboard/QuickLinksCard";
import CalendarCard from "@/components/dashboard/CalendarCard";
import styled from "styled-components";

export default function Home() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <Spotlight
        className="-top-40! left-0! md:left-60! md:-top-20!"
        fill="red"
      />

      <StyledContainer className="flex h-full">
        {/* Left content - Dashboard Cards */}
        <div className="left-panel flex-1 p-8! relative z-10 overflow-y-auto">
          <div className="cards-grid">
            <div className="card-wrapper">
              <NotesCard />
            </div>
            <div className="card-wrapper">
              <TimerCard />
            </div>
            <div className="card-wrapper">
              <QuickLinksCard />
            </div>
            <div className="card-wrapper">
              <CalendarCard />
            </div>
          </div>
        </div>

        {/* Right content - Spline Scene */}
        <div className="flex-1 relative hidden lg:block">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </StyledContainer>
    </div>
  );
}

const StyledContainer = styled.div`
  .left-panel {
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(193, 163, 98, 0.3);
      border-radius: 4px;

      &:hover {
        background: rgba(193, 163, 98, 0.5);
      }
    }
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;
    max-width: 1200px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .card-wrapper {
    min-height: 300px;
  }
`;
