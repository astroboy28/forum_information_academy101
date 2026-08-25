import django_filters as filters

from .models import Student


class StudentFilter(filters.FilterSet):
    grade_level = filters.CharFilter(field_name="grade_level")
    gender = filters.CharFilter(field_name="gender")
    jlpt_level = filters.CharFilter(field_name="jlpt_level")
    nationality = filters.CharFilter(field_name="nationality", lookup_expr="icontains")
    enrolled_after = filters.DateFilter(field_name="enrollment_date", lookup_expr="gte")
    enrolled_before = filters.DateFilter(field_name="enrollment_date", lookup_expr="lte")
    is_active = filters.BooleanFilter(field_name="is_active")

    class Meta:
        model = Student
        fields = ["grade_level", "gender", "jlpt_level", "nationality", "is_active", "class_name"]
```

### Step 2 — `students/views.py` (updated `StudentViewSet`)
```python
from rest_framework import viewsets

from .filters import StudentFilter
from .models import AttendanceRecord, Student
from .serializers import (
    AttendanceRecordSerializer,
    StudentDetailSerializer,
    StudentListSerializer,
)


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().prefetch_related("attendance_records")
    filterset_class = StudentFilter
    search_fields = [
        "student_number", "call_name", "full_name", "full_name_kana",
        "email", "nationality", "previous_school",
    ]
    ordering_fields = ["student_number", "call_name", "birthday", "grade_level", "enrollment_date", "jlpt_level"]
    ordering = ["student_number"]

    def get_serializer_class(self):
        if self.action == "list":
            return StudentListSerializer
        return StudentDetailSerializer


class AttendanceRecordViewSet(viewsets.ModelViewSet):
    queryset = AttendanceRecord.objects.select_related("student")
    serializer_class = AttendanceRecordSerializer
    filterset_fields = ["student", "status", "date"]
    ordering_fields = ["date"]
    ordering = ["-date"]