import getCoursesByCategory from "@/actions/getCourses";
import { CardComponent } from "@/component/CardComponent";
import { CarouselComponent } from "@/component/CarouselComponent";
// import CustomSidebar from "@/component/CustomSidebar";
import { Component } from "@/component/Footer";
import { Header } from "@/component/Header";
import { CourseDto } from "@/dto/course.dto";

export default async function Home() {
  const courses: CourseDto[] = await getCoursesByCategory();

  return (
    <div className="">
      <Header />
      <div className="mt-20 container mx-auto mb-80">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <CarouselComponent />
        </div>
        <div className="mt-5">
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
            Khóa Học Training Famima
          </h1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <CardComponent key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
      <Component />
    </div>
  );
}
